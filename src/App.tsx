import createDataQueryOptions from "./queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

const COLUMNS = 1;

function App() {
  const { data: cardData } = useSuspenseQuery(createDataQueryOptions());

  const rowCount = Math.ceil(cardData.length / COLUMNS);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 120,
    overscan: 5,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const translateY = virtualRows.length > 0 ? virtualRows[0].start : 0;

  return (
    <div className="w-[100vh] overflow-auto">
      <div
        className="relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {virtualRows.map(({ index, key }) => {
            const startIndex = index * COLUMNS;
            const rowCards = cardData.slice(startIndex, startIndex + COLUMNS);

            return (
              <div
                className="grid gap-4 my-6"
                key={key}
                data-index={index}
                style={{
                  gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
                }}
              >
                {rowCards.map((card, cardIndex) => (
                  <Card key={startIndex + cardIndex} index={startIndex + cardIndex} data={card} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
