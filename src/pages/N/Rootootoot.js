import React from "react";
import "./N.css";
import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
} from "../../components/modals/Lightbox";
import ScreenshotsCarousel from "../../components/modals/ScreenshotsCarousel";

function Rootootoot() {
  const cd = [
    {
      src: "../../../img/n/cd-rootootoot-front.jpg",
      alt: "rootootoot PC-CD front",
    },
    {
      src: "../../../img/n/cd-rootootoot-back.jpg",
      alt: "rootootoot PC-CD back",
    },
    {
      src: "../../../img/n/cd-rootootoot-inside.jpg",
      alt: "rootootoot PC-CD inside",
    },
  ];

  return (
    <section>
      <header>rootootoot</header>
      <article className="pack-overview">
        <p>
          In 2018, I set out on the monumental task of compiling every map I'd
          ever created. From this extensive archive, I painstakingly whittled it
          down to my favorite 500 - a personal collection reflecting the journey
          of my creativity. These maps have been presented in an episodic format
          resembling the original game, with their order indicating a gentle
          progression in difficulty and complexity.
        </p>
        <p>
          A notable mention is 'Column R.' This segment features a unique
          collection of 50 maps, chosen from the original 500 due to their
          distinctiveness.
        </p>
        <p>
          And for those seeking an extra thrill, 'Column B' offers a remix that
          redefines the game. Here you'll find 50 bonus levels, each reinvented
          under one of five remix categories: 'Red Gold', 'Hard Mode', 'Topsy
          Turvy', 'Chaos Edition [NReality Required]', and 'Data Corruption.'
          Each category introduces ten radical reimaginings, offering a fresh,
          challenging twist to keep you on your toes.
        </p>
      </article>

      <article className="download">
        <a
          href="https://s3.eu-north-1.amazonaws.com/banjodave.com/n/DW40_rootootoot.rar"
          title="DW40_rootootoot.zip [1.27 MB]"
        >
          &gt; rootootoot free download (game included!) &lt;
        </a>
        <a
          href="https://packs.droni.es/47f49e3074ce84b685"
          target="_blank"
          rel="noreferrer"
        >
          or browse maps on packs.droni.es
        </a>
      </article>

      <article>
        <h2 className="header-m  under-construction">
          rootootoot Collector's Edition PC-CD, Coming Soon!
        </h2>
        <div className="product">
          <div className="product-carousel">
            <ScreenshotsCarousel screenshots={cd} />
          </div>
          <div className="product-description">
            <h2 className="header-d under-construction">
              rootootoot Collector's Edition PC-CD, Coming Soon!
            </h2>
            <p>
              Encased in a classic jewel case and embellished with the exclusive
              BanjoWare sticker. Not just a decorative piece, this CD includes
              the full rootootoot map pack. Even though we live in the age of
              digital downloads, this physical copy offers an irreplaceable
              tactile and visual experience that will take you back to the
              golden days of gaming.
            </p>
            <button>Coming Soon</button>
          </div>
        </div>
      </article>

      <article>
        <div className="product">
          <h2 className="header-m">rootootoot 500 Poster</h2>
          <div className="product-carousel">
            <Lightbox>
              <LightboxTrigger>
                <img
                  src="../../../img/n/poster-rootootoot-500.png"
                  alt="rootootoot 500 poster"
                  className="lightbox-trigger"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxContent
                src="../../../img/n/poster-rootootoot-500.png"
                alt="rootootoot 500 poster"
              />
            </Lightbox>
          </div>
          <div className="product-description">
            <h2 className="header-d">rootootoot 500 Poster</h2>
            <p>A3, Single Sided, Classic Silk. All 500 maps.</p>
            <p>
              <a href="#top" target="_blank" rel="noreferrer">
                Full-resolution [4960 x 3508px] download on Patreon
              </a>
            </p>
            <button>Coming Soon</button>
          </div>
        </div>
        <div className="product">
          <h2 className="header-m">rootootoot 50 Poster</h2>
          <div className="product-carousel">
            <Lightbox>
              <LightboxTrigger>
                <img
                  src="../../../img/n/poster-rootootoot-50.png"
                  alt="rootootoot 50 poster"
                  className="lightbox-trigger"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxContent
                src="../../../img/n/poster-rootootoot-50.png"
                alt="rootootoot 50 poster"
              />
            </Lightbox>
          </div>
          <div className="product-description">
            <h2 className="header-d">rootootoot 50 Poster</h2>
            <p>A3, Single Sided, Classic Silk. Column R.</p>
            <p>
              <a href="#top" target="_blank" rel="noreferrer">
                Full-resolution [3508 x 4960px] download on Patreon
              </a>
            </p>
            <button>Coming Soon</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Rootootoot;
