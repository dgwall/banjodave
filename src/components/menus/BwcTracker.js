import React, { useEffect, useState } from "react";

const BwcTracker = ({ data, access }) => {
  const [baseHue, setBaseHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBaseHue((prevHue) => (prevHue + 1) % 360);
    }, 80);

    // Clean up on component unmount
    return () => clearInterval(interval);
  }, []);

  let categories = {};
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  sortedData.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = {
        level1: [],
        level2: [],
      };
    }

    if (item.accessLevel === 1) {
      categories[item.category].level1.push(item);
    } else if (item.accessLevel === 2) {
      categories[item.category].level2.push(item);
    }
  });

  const categoriesKeys = Object.keys(categories).sort();
  const hueStep = 360 / categoriesKeys.length;

  return (
    <div>
      {categoriesKeys.map((category, index) => {
        const hue = (baseHue + index * hueStep) % 360;
        return (
          <div key={index}>
            <br />
            <u
              style={{
                background: `linear-gradient(60deg,hsl(${hue}, 100%, 66.7%) 0%,hsl(${
                  hue + 40
                }, 100%, 66.7%) 95%,hsl(${hue + 90}, 100%, 66.7%) 100%)`,
                boxShadow: `0 0 0.5rem hsl(${hue + 20}, 100%, 66.7%)`,
              }}
            >
              &#11043; {category}
            </u>
            {access === 1
              ? categories[category].level2.length > 0 && (
                  <p>
                    &#9650; [{categories[category].level2.length} L2 FILE
                    {categories[category].level2.length > 1 && "S"} REDACTED]
                  </p>
                )
              : categories[category].level2.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`l2`}
                  >
                    &#9650; {item.name} <span>{item.details}</span>
                  </a>
                ))}
            {categories[category].level1.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`l1`}
              >
                &#9632; {item.name} <span>{item.details}</span>
              </a>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default BwcTracker;
