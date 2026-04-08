const BASE_URL = process.env.IMAGE_BASE_URL;

export const mapProductImages = (product) => {
    const { image } = product;

    return {
        ...product,
        imageUrl: `${BASE_URL}/thumb/${image}_400x400.webp`,
        imageOriginalUrl: `${BASE_URL}/original/${image}.png`,
        imageProductUrl: `${BASE_URL}/products/${image}.webp`,
    };
};