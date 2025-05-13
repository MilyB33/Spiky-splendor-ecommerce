import { PricingService, TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, In } from "typeorm";
import { MedusaError } from "medusa-core-utils";
import { WishlistRepository } from "../repositories/wishlist";
import { WishlistItemRepository } from "../repositories/wishlist-item";
import {
  AddCustomerToWishlistItemStateInput,
  AddWishlistItemStateInput,
  CreateWishlistStateInput,
  RemoveWishlistItemStateInput,
  RetrieveWishlistStateInput,
} from "../types/wishlist";
import { Wishlist } from "src/models/wishlist";
import CustomerService from "./customer";

type InjectedDependencies = {
  manager: EntityManager;
  wishlistRepository: typeof WishlistRepository;
  wishlistItemRepository: typeof WishlistItemRepository;
  customerService: CustomerService;
  pricingService: PricingService;
};

class WishlistService extends TransactionBaseService {
  protected readonly wishlistRepository_: typeof WishlistRepository;
  protected readonly wishlistItemRepository_: typeof WishlistItemRepository;
  protected readonly customerService_: CustomerService;
  protected readonly pricingService_: PricingService;

  constructor({
    wishlistRepository,
    wishlistItemRepository,
    customerService,
    pricingService,
  }: InjectedDependencies) {
    super(arguments[0]);
    this.wishlistRepository_ = wishlistRepository;
    this.wishlistItemRepository_ = wishlistItemRepository;
    this.customerService_ = customerService;
    this.pricingService_ = pricingService;
  }
  async create(payload: CreateWishlistStateInput) {
    const { region_id, currency_code, ...restPayload } = payload;

    const wishlistRepository = this.activeManager_.withRepository(
      this.wishlistRepository_
    );

    const createdWishlist = wishlistRepository.create(restPayload);
    const savedWishlist = await wishlistRepository.save(createdWishlist);
    const { id } = savedWishlist;

    const [wishlist] = await wishlistRepository.find({
      where: { id },
      relations: [
        "items",
        "items.product",
        "items.product.categories",
        "items.product.variants",
        "items.product.variants.prices",
      ],
    });

    const items = await this.addPricesToProducts(
      wishlist.items,
      region_id,
      currency_code
    );

    return { ...wishlist, items };
  }

  async retrieve(payload: RetrieveWishlistStateInput) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      const { id, region_id, currency_code } = payload;
      const [wishlist] = await wishlistRepository.find({
        where: { id },

        relations: [
          "items",
          "items.product",
          "items.product.categories",
          "items.product.variants",
          "items.product.variants.prices",
        ],
      });
      if (!wishlist) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `Wishlist with ${id} was not found`
        );
      }

      const items = await this.addPricesToProducts(
        wishlist.items,
        region_id,
        currency_code
      );

      return { ...wishlist, items };
    });
  }
  async addWishItem(payload: AddWishlistItemStateInput) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.withRepository(
        this.wishlistItemRepository_
      );
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      const { wishlist_id, product_id, region_id, currency_code } = payload;

      const [item] = await wishlistItemRepository.find({
        where: { wishlist_id, product_id },
      });
      if (!item) {
        const createdItem = wishlistItemRepository.create({
          wishlist_id,
          product_id,
        });
        await wishlistItemRepository.save(createdItem);
      }
      const [wishlist] = await wishlistRepository.find({
        where: { id: wishlist_id },
        relations: [
          "items",
          "items.product",
          "items.product.categories",
          "items.product.variants",
          "items.product.variants.prices",
        ],
      });

      const items = await this.addPricesToProducts(
        wishlist.items,
        region_id,
        currency_code
      );

      return { ...wishlist, items };
    });
  }

  async removeWishItem(payload: RemoveWishlistItemStateInput) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.withRepository(
        this.wishlistItemRepository_
      );
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      const { ids, wishlist_id, region_id, currency_code } = payload;

      const items = await wishlistItemRepository.find({
        where: { id: In(ids) },
      });

      if (items.length) {
        await wishlistItemRepository.remove(items);
      }
      const [wishlist] = await wishlistRepository.find({
        where: { id: wishlist_id },
        relations: [
          "items",
          "items.product",
          "items.product.categories",
          "items.product.variants",
          "items.product.variants.prices",
        ],
      });

      const newItems = await this.addPricesToProducts(
        wishlist.items,
        region_id,
        currency_code
      );

      return { ...wishlist, items: newItems };
    });
  }

  async addCustomerToWishlist(payload: AddCustomerToWishlistItemStateInput) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      const { region_id, currency_code, ...data } = payload;

      await wishlistRepository.update(
        { id: data.id },
        { customer_id: data.customer_id }
      );

      const [wishlist] = await wishlistRepository.find({
        where: { id: data.id },
        relations: [
          "items",
          "items.product",
          "items.product.categories",
          "items.product.variants",
          "items.product.variants.prices",
        ],
      });

      const items = await this.addPricesToProducts(
        wishlist.items,
        region_id,
        currency_code
      );

      return { ...wishlist, items };
    });
  }

  async userWishlist(
    payload: Omit<RetrieveWishlistStateInput, "id"> & { customer_id: string }
  ) {
    const { region_id, currency_code, customer_id } = payload;

    const [wishlist] = await this.wishlistRepository_.find({
      where: { customer_id: customer_id },
      relations: [
        "items",
        "items.product",
        "items.product.categories",
        "items.product.variants",
        "items.product.variants.prices",
      ],
    });

    if (!wishlist) {
      return await this.create({
        currency_code: payload.currency_code,
        customer_id: payload.customer_id,
        region_id: payload.region_id,
      });
    }

    const items = await this.addPricesToProducts(
      wishlist.items,
      region_id,
      currency_code
    );

    return { ...wishlist, items };
  }

  async addPricesToProducts(
    items: Wishlist["items"] = [],
    region_id: string,
    currency_code: string
  ) {
    if (!region_id || !currency_code) return items;

    const products = items.map((item) => item.product);

    const productsWithPrices = await this.pricingService_.setProductPrices(
      products,
      { region_id, currency_code }
    );

    const mappedWishlistItems = items.map((item) => {
      const product = productsWithPrices.find(
        (product) => product.id === item.product_id
      );

      return {
        ...item,
        product,
      };
    });

    return mappedWishlistItems;
  }
}

export default WishlistService;
