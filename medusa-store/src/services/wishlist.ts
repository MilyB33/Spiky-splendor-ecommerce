import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, In } from "typeorm";
import { MedusaError } from "medusa-core-utils";
import { WishlistRepository } from "../repositories/wishlist";
import { WishlistItemRepository } from "../repositories/wishlist-item";
import { CreateWishlistStateInput } from "../types/wishlist";
import { CustomerRepository } from "@medusajs/medusa/dist/repositories/customer";
import { Wishlist } from "src/models/wishlist";

type InjectedDependencies = {
  manager: EntityManager;
  wishlistRepository: typeof WishlistRepository;
  wishlistItemRepository: typeof WishlistItemRepository;
  customerRepository: typeof CustomerRepository;
};

class WishlistService extends TransactionBaseService {
  protected readonly wishlistRepository_: typeof WishlistRepository;
  protected readonly wishlistItemRepository_: typeof WishlistItemRepository;
  protected readonly customerRepository_: typeof CustomerRepository;

  constructor({
    wishlistRepository,
    wishlistItemRepository,
    customerRepository,
  }: InjectedDependencies) {
    super(arguments[0]);
    this.wishlistRepository_ = wishlistRepository;
    this.wishlistItemRepository_ = wishlistItemRepository;
    this.customerRepository_ = customerRepository;
  }
  async create(payload: CreateWishlistStateInput) {
    // TODO: can't save wishlist id to customer model
    // return await this.atomicPhase_(
    //   async (transactionManager: EntityManager) => {
    const wishlistRepository = this.activeManager_.withRepository(
      this.wishlistRepository_
    );

    const createdWishlist = wishlistRepository.create(payload);
    const savedWishlist = await wishlistRepository.save(createdWishlist);
    const { id } = savedWishlist;

    if (payload.customer_id && id) {
      const customer = await this.customerRepository_.findOne({
        where: { id: payload.customer_id },
      });

      if (customer) {
        customer.wishlist_id = id;

        await this.customerRepository_.save(customer);
      }
    }

    const [wishlist] = await wishlistRepository.find({
      where: { id },
      relations: ["items", "items.product"],
    });

    return wishlist;
    //   }
    // );
  }
  async retrieve(id: string) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );
      const [wishlist] = await wishlistRepository.find({
        where: { id },
        // TODO: it's not adding a price like for extend in product
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
      return wishlist;
    });
  }
  async addWishItem(wishlist_id: string, product_id: string) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.withRepository(
        this.wishlistItemRepository_
      );
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );
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
        relations: ["items", "items.product"],
      });
      return wishlist;
    });
  }

  async removeWishItem(ids: string[], wishlist_id: string) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.withRepository(
        this.wishlistItemRepository_
      );
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      const items = await wishlistItemRepository.find({
        where: { id: In(ids) },
      });

      if (items.length) {
        await wishlistItemRepository.remove(items);
      }
      const [wishlist] = await wishlistRepository.find({
        where: { id: wishlist_id },
        relations: ["items", "items.product"],
      });

      return wishlist;
    });
  }

  async addCustomerToWishlist(data: Pick<Wishlist, "customer_id" | "id">) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistRepository = transactionManager.withRepository(
        this.wishlistRepository_
      );

      await wishlistRepository.update(
        { id: data.id },
        { customer_id: data.customer_id }
      );

      await this.customerRepository_.update(
        { id: data.customer_id },
        { wishlist_id: data.id }
      );

      const [wishlist] = await wishlistRepository.find({
        where: { id: data.id },
        relations: ["items", "items.product"],
      });

      return wishlist;
    });
  }
}

export default WishlistService;
