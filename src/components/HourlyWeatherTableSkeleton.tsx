export default function HourlyWeatherTableSkeleton({
  columns = 8,
}: {
  columns?: number;
}) {
  const skeletonCols = Array.from({ length: columns });

  return (
    <>
      <h2 className="sr-only">Loading Hourly Forecast</h2>
      <table
        className="min-w-max w-full text-center border-collapse bg-gray-50 rounded-lg shadow overflow-x-auto animate-pulse"
        aria-busy="true"
      >
        <thead>
          <tr>
            <th className="bg-gray-100 sticky left-0 z-10">
              <span className="sr-only">Metric</span>
            </th>
            {skeletonCols.map((_, i) => (
              <th
                key={i}
                className="p-2 text-sm font-semibold text-gray-300 bg-gray-100"
                scope="col"
              >
                <div className="h-4 w-12 mx-auto rounded bg-gray-200" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['Temp', 'Feels Like', 'Humidity', 'Precip %', 'UV Index'].map(
            (label) => (
              <tr key={label}>
                <td className="p-2 text-md md:text-lg text-gray-300 bg-gray-50 sticky left-0">
                  <div className="h-4 w-12 rounded bg-gray-200 mx-auto" />
                </td>
                {skeletonCols.map((_, i) => (
                  <td key={i} className="p-2">
                    <div className="h-6 w-12 rounded bg-gray-200 mx-auto" />
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
