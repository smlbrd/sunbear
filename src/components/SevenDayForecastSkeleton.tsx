export default function SevenDayForecastSkeleton({
  days = 8,
}: {
  days?: number;
}) {
  const skeletonDays = Array.from({ length: days });

  return (
    <section className="mt-4 bg-gray-50">
      <h2 className="sr-only">Loading 7-Day Forecast</h2>
      <div className="max-w-[1280px] mx-auto">
        <div
          className="
            flex overflow-x-auto p-2
            lg:overflow-x-visible
            lg:grid lg:grid-cols-8 lg:items-end lg:h-48
          "
          aria-busy="true"
        >
          {skeletonDays.map((_, i) => (
            <div
              key={i}
              className={`
                flex flex-col items-center bg-white
                border border-gray-200
                min-w-[104px] h-40 px-4 py-3 lg:px-6
                animate-pulse
                ${i === 0 ? 'rounded-l-lg' : ''}
                ${i === days - 1 ? 'rounded-r-lg' : ''}
                lg:col-span-1 lg:h-44
              `}
            >
              <span className="h-4 w-16 mb-2 rounded bg-gray-200" />
              <span className="w-12 h-12 mb-2 rounded-full bg-gray-200" />
              <span className="h-6 w-12 mb-2 rounded bg-gray-200" />
              <span className="h-4 w-16 mb-2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
