import type { Building } from "./buildings";

// Real, licensed photos for a handful of well-known buildings, downloaded
// from Wikimedia Commons and self-hosted under public/photos/ — not
// hotlinked. Every photo carries its licence and source so it's clear these
// are credited third-party images, not project-produced material.

export interface Photo {
  src: string;
  alt: string;
  credit: { author: string; license: string; sourceUrl: string };
}

export interface BuildingPhotos {
  hero: Photo;
  gallery?: Photo[];
}

const photos: Record<string, BuildingPhotos> = {
  "15": {
    hero: {
      src: "/photos/building-15-exterior.jpg",
      alt: "Exterior of the Chifley Library at ANU",
      credit: {
        author: "Cfitzart",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Chifley_library_at_anu.JPG",
      },
    },
    gallery: [
      {
        src: "/photos/building-15-interior.jpg",
        alt: "Computer area on the ground floor of the Chifley Library",
        credit: {
          author: "Nick-D",
          license: "CC BY-SA 3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Computer_area_on_the_ground_level_of_the_Chifley_Library_July_2013.jpeg",
        },
      },
    ],
  },
  "43": {
    hero: {
      src: "/photos/building-43-exterior.jpg",
      alt: "Western side of the WK Hancock Building at ANU",
      credit: {
        author: "Nick-D",
        license: "CC BY-SA 4.0",
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:Western_side_of_the_WK_Hancock_Building_September_2026.jpg",
      },
    },
    gallery: [
      {
        src: "/photos/building-43-interior.jpg",
        alt: "Foyer of the Hancock Library",
        credit: {
          author: "Nick-D",
          license: "CC BY-SA 4.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Foyer_of_the_Hancock_Library_June_2024.jpg",
        },
      },
    ],
  },
  "2": {
    hero: {
      src: "/photos/building-2-exterior.jpg",
      alt: "RG Menzies Building at ANU, home of the Menzies Library",
      credit: {
        author: "ColonelLight",
        license: "CC0 1.0 (public domain)",
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:RG_Menzies_Building_ANU_University_Library.jpg",
      },
    },
    gallery: [
      {
        src: "/photos/building-2-interior.jpg",
        alt: "Seating on level 1 of the Menzies Library",
        credit: {
          author: "Nick-D",
          license: "CC BY-SA 4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Seating_in_level_1_of_the_Menzies_Library_July_2026.jpg",
        },
      },
    ],
  },
  "155": {
    hero: {
      src: "/photos/building-155-a.jpg",
      alt: "The Marie Reay Teaching Centre in the Kambri precinct at ANU",
      credit: {
        author: "Alvinz",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Marie_Reay_Teaching_Centre_ANU_1.jpg",
      },
    },
    gallery: [
      {
        src: "/photos/building-155-b.jpg",
        alt: "Another view of the Marie Reay Teaching Centre",
        credit: {
          author: "Alvinz",
          license: "CC BY-SA 4.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Marie_Reay_Teaching_Centre_ANU_2.jpg",
        },
      },
    ],
  },
};

export function photosFor(building: Building): BuildingPhotos | undefined {
  return photos[building.number];
}
