import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

/**
 * JSON-LD built only from facts the repository can support. No ratings, no
 * reviews, no employer, no awards.
 */
export function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.brand,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Independent developer and creative technologist",
    description:
      "Independent software developer and creative technologist in Nigeria, building websites, storefronts and web applications as AYODEX Labs.",
    address: { "@type": "PostalAddress", addressCountry: "NG" },
    sameAs: [site.github],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web design",
      "Front-end development",
      "E-commerce interfaces",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: `${site.brand}.`,
    description:
      "Portfolio of Elasoru Solomon Ayodeji: websites, storefronts, web applications and digital experiments.",
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
    author: { "@id": `${site.url}/#person` },
  };

  const works = projects.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${project.slug}/#work`,
    name: project.name,
    description: project.summary,
    url: `${site.url}/work/${project.slug}`,
    genre: project.category,
    keywords: project.stack.join(", "),
    creator: { "@id": `${site.url}/#person` },
    dateCreated: project.year,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, ...works],
  };

  return (
    <script
      type="application/ld+json"
      // Content is static, typed data. No user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
