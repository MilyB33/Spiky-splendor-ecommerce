import FileService from "@medusajs/file-local/dist/services/local-file-service";
import { ProductService } from "@medusajs/medusa";
import { ConfigModule, MedusaContainer } from "@medusajs/medusa";
import fs_promises from "fs/promises";
import path from "path";

const IMAGES_MAPPING = [
  {
    id: "prod_1",
    images: [
      "Adromischus-cristatus_01.jpg",
      "Adromischus-cristatus_02.jpg",
      "Adromischus-cristatus_03.jpg",
    ],
  },
  {
    id: "prod_2",
    images: ["Adromischus-maculatus_01.jpg", "Adromischus-maculatus_02.jpg"],
  },
  {
    id: "prod_3",
    images: [
      "adromischus-cooperii_01.jpg",
      "adromischus-cooperii_02.jpg",
      "adromischus-cooperii_03.jpg",
    ],
  },
  {
    id: "prod_4",
    images: [
      "Adromischus-littlespheroid_01.jpg",
      "Adromischus-littlespheroid_02.jpg",
      "Adromischus-littlespheroid_03.jpg",
    ],
  },
  {
    id: "prod_aloe_1",
    images: ["Aloe-vera_01.jpg", "Aloe-vera_02.jpg", "Aloe-vera_03.jpg"],
  },
  {
    id: "prod_aloe_2",
    images: ["Aloe-juvenna_01.jpeg", "Aloe-juvenna_02.jpeg"],
  },
  {
    id: "prod_aloe_3",
    images: [
      "Aloe-aristata_01.jpg",
      "Aloe-aristata_02.jpg",
      "Aloe-aristata_03.jpg",
    ],
  },
  {
    id: "prod_aloe_4",
    images: [
      "Aloe-humilis_01.jpg",
      "Aloe-humilis_02.jpg",
      "Aloe-humilis_03.jpg",
    ],
  },
  {
    id: "prod_ceropegia_1",
    images: [
      "Ceropegia-woodiii_01.jpg",
      "Ceropegia-woodiii_02.jpg",
      "Ceropegia-woodiii_03.jpg",
    ],
  },
  {
    id: "prod_ceropegia_2",
    images: [
      "ceropegia-sandersonii_01.jpg",
      "ceropegia-sandersonii_02.jpg",
      "ceropegia-sandersonii_03.jpg",
    ],
  },
  {
    id: "prod_ceropegia_3",
    images: ["Ceropegia-ampliata_01.jpg", "Ceropegia-ampliata_02.jpg"],
  },
  {
    id: "prod_ceropegia_4",
    images: ["ceropegia-woodii_01.jpg", "ceropegia-woodii_02.jpg"],
  },
  {
    id: "prod_dracaena_1",
    images: ["Dracaena-marginata_01.webp", "Dracaena-marginata_02.webp"],
  },
  {
    id: "prod_dracaena_2",
    images: [
      "Dracaena-fragrans_01.webp",
      "Dracaena-fragrans_02.webp",
      "Dracaena-fragrans_03.webp",
    ],
  },
  {
    id: "prod_dischidia_1",
    images: [
      "dischidia-nummularia_01.jpg",
      "dischidia-nummularia_02.jpg",
      "dischidia-nummularia_03.jpg",
    ],
  },
  {
    id: "prod_dischidia_2",
    images: [
      "dischidia-ovata_01.jpg",
      "dischidia-ovata_02.jpg",
      "dischidia-ovata_03.jpg",
    ],
  },
  {
    id: "prod_dischidia_3",
    images: [
      "dischidia-ruscifolia_01.jpg",
      "dischidia-ruscifolia_02.jpg",
      "dischidia-ruscifolia_03.jpg",
    ],
  },
  {
    id: "prod_sansevieria_1",
    images: [
      "sansevieria-laurenti_01.jpg",
      "sansevieria-laurenti_02.jpg",
      "sansevieria-laurenti_03.jpg",
    ],
  },
  {
    id: "prod_sansevieria_2",
    images: [
      "sansevieria-cylindrica_01.jpg",
      "sansevieria-cylindrica_02.jpg",
      "sansevieria-cylindrica_03.jpg",
    ],
  },
  {
    id: "prod_crassula_1",
    images: ["crassula-ovata_01.jpg", "crassula-ovata_02.jpg"],
  },
  {
    id: "prod_haworthia_1",
    images: [
      "Haworthia-fasciata_01.webp",
      "Haworthia-fasciata_02.webp",
      "Haworthia-fasciata_03.webp",
    ],
  },
  {
    id: "prod_kaktus_1",
    images: [
      "Mammillaria-elongata_01.jpg",
      "Mammillaria-elongata_02.jpg",
      "Mammillaria-elongata_03.jpg",
    ],
  },
  {
    id: "prod_kaktus_2",
    images: [
      "Echinopsis-subdenudata_01.jpg",
      "Echinopsis-subdenudata_02.jpg",
      "Echinopsis-subdenudata_03.jpg",
    ],
  },
  {
    id: "prod_kalanchoe_1",
    images: ["kalanchoe-tomentosa_01.jpg", "kalanchoe-tomentosa_02.jpg"],
  },
  {
    id: "prod_nolina_1",
    images: ["Nolina-recurvata_01.jpg"],
  },
  {
    id: "prod_nolina_2",
    images: ["nolina-longifolia_01.jpg"],
  },
  {
    id: "prod_opuncja_1",
    images: ["opuntia-microdasys_01.jpg", "opuntia-microdasys_02.jpg"],
  },
  {
    id: "prod_peperomia_1",
    images: ["peperomia_obtusifolia_01.jpg"],
  },
  {
    id: "prod_peperomia_2",
    images: ["peperomia-rosso_01.jpg"],
  },
  {
    id: "prod_peperomia_3",
    images: ["peperomia_argyreia_01.jpg", "peperomia_argyreia_02.jpg"],
  },
  {
    id: "prod_rochodnik_1",
    images: ["sedum_morganium_01.png"],
  },
  {
    id: "prod_ripsalis_1",
    images: ["rhipsalis_cassutha_01.jpg", "rhipsalis_cassutha_02.jpg"],
  },
  {
    id: "prod_ripsalis_2",
    images: ["rhipsalis-baccifera_01.jpg", "rhipsalis-baccifera_02.jpg"],
  },
  {
    id: "prod_sansewieria_1",
    images: [
      "sansevieria-trifasciata_01.png",
      "sansevieria-trifasciata_02.png",
    ],
  },
  {
    id: "prod_wilczomlecze_1",
    images: ["euphorbia-tirucalli_01.jpg"],
  },
  {
    id: "prod_zywe_kamienie_1",
    images: ["Lithops_lesliei_01.jpg"],
  },
];

export default async (
  container: MedusaContainer,
  config: ConfigModule
): Promise<void> => {
  console.info("Starting loader...");

  const fileService = container.resolve<FileService>("fileService");
  const productService = container.resolve<ProductService>("productService");
  const productsFolderPath = path.join(__dirname, "..", "static", "products");

  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const any_product = await productService.retrieve("prod_1");

  if (any_product.thumbnail) {
    console.info("Loader skipped...");
    return;
  }

  const filesPaths = await fs_promises.readdir(productsFolderPath);

  await Promise.all(
    filesPaths.map(async (file) => {
      const filePath = path.join(productsFolderPath, file);
      const fileStat = await fs_promises.stat(filePath);
      if (!fileStat.isFile()) return;

      const fileBuffer = await fs_promises.readFile(filePath);
      const multerFile = {
        fieldname: "file",
        originalname: file,
        encoding: "utf-8",
        path: filePath,
        mimetype: "application/octet-stream",
        buffer: fileBuffer,
        size: fileStat.size,
      };

      try {
        const data = await fileService.uploadFile(multerFile);

        for (const product of IMAGES_MAPPING) {
          const idx = product.images.findIndex((img) => data.url.includes(img));
          if (idx !== -1) {
            product.images[idx] = data.url;
            break;
          }
        }
      } catch (err) {
        console.log("Error uploading file:", String(err));
      }
    })
  );

  for (const product of IMAGES_MAPPING) {
    try {
      if (product.images.length === 0) continue;

      await productService.update(product.id, {
        images: product.images,
        thumbnail: product.images[0],
      });
    } catch (err) {
      setTimeout(async () => {
        await productService.update(product.id, {
          images: product.images,
          thumbnail: product.images[0],
        });
      }, 2000);
    }
  }

  console.info("Ending loader...");
};
