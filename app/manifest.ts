import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BoiBazaar - Used Textbook Exchange",
    short_name: "BoiBazaar",
    description:
      "BoiBazaar is a student-to-student marketplace for secondhand textbooks across Bangladeshi universities.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F4EF",
    theme_color: "#1B2A4A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
