import React from "react";
import "./N.css";
import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
} from "../../shared/Lightbox";
import ScreenshotsCarousel from "../../shared/ScreenshotsCarousel";

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
          In 2018, I set out on the monumental task of compiling every map I've
          ever crafted. From this extensive collection, I painstakingly curated
          my top 500 - a showcase of my best work. These maps were then
          meticulously structured into an episodic format matching to original
          game. Their arrangement reflects a progression in both difficulty and
          complexity.
        </p>
        <p>
          To further highlight the cream of the crop, I've included a special
          selection: 'Column R.' This features an elite lineup of 50 maps,
          handpicked from the original 500 for their standout qualities.
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
        <p>
          <a
            href="https://s3.eu-north-1.amazonaws.com/banjodave.com/n/DW40_rootootoot.rar"
            title="DW40_rootootoot.zip [1.27 MB]"
          >
            Download rootootoot now (game included)!
          </a>
        </p>
        <p>
          <a
            href="https://packs.droni.es/47f49e3074ce84b685"
            target="_blank"
            rel="noreferrer"
          >
            Browse maps on packs.droni.es
          </a>
        </p>
      </article>

      <article>
        <div className="product">
          <div className="product-carousel">
            <ScreenshotsCarousel screenshots={cd} />
          </div>
          <div className="product-description">
            <h2>Out Now on PC-CD!</h2>
            <p>
              description description description description description
              description description description description description
              description{" "}
            </p>
            <button>Add to Cart</button>
          </div>
        </div>
      </article>

      <article>
        <h2>Posters</h2>
        <div className="product">
          <div className="product-carousel">
            <Lightbox>
              <LightboxTrigger>
                <img
                  src="../../../img/n/poster-rootootoot-500.png"
                  alt="rootootoot 500 poster"
                  className="lightbox-trigger"
                />
              </LightboxTrigger>
              <LightboxContent
                src="../../../img/n/poster-rootootoot-500.png"
                alt="rootootoot 500 poster"
              />
            </Lightbox>
          </div>
          <div className="product-description">
            <h2>rootootoot 500 Poster</h2>
            <p>A3, Single Sided, Classic Silk, No Lamination. All 500 maps.</p>
            <p>
              <a href="#top" target="_blank" rel="noreferrer">
                Full-resolution [4960 x 3508] download on Patreon
              </a>
            </p>
            <button>Add to Cart</button>
          </div>
        </div>
        <div className="product">
          <div className="product-carousel">
            <Lightbox>
              <LightboxTrigger>
                <img
                  src="../../../img/n/poster-rootootoot-50.png"
                  alt="rootootoot 50 poster"
                  className="lightbox-trigger"
                />
              </LightboxTrigger>
              <LightboxContent
                src="../../../img/n/poster-rootootoot-50.png"
                alt="rootootoot 50 poster"
              />
            </Lightbox>
          </div>
          <div className="product-description">
            <h2>rootootoot 50 Poster</h2>
            <p>A3, Single Sided, Classic Silk, No Lamination. Column R.</p>
            <p>
              <a href="#top" target="_blank" rel="noreferrer">
                Full-resolution [3508 x 4960] download on Patreon
              </a>
            </p>
            <button>Add to Cart</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Rootootoot;
