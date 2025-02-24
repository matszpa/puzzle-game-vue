const shuffleImages = (imageCount: number, size: number) => {
    const images = Array.from({length: imageCount}, (_, i) => new URL(`../assets/${i + 1}.jpg`, import.meta.url).href);
    const imagesToUse = [...images, ...images].slice(0, size);
    for (let i = imagesToUse.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesToUse[i], imagesToUse[j]] = [imagesToUse[j], imagesToUse[i]];
    }
    return imagesToUse.map((image, index) => ({
        id: index,
        url: image,
        isMatched: false,
        isFlipped: false,
    }));
};

export default shuffleImages;