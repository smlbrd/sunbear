import { type LoadingProps } from '../types/loading.types';

export default function Loading({ loading }: LoadingProps) {
  if (!loading) return null;

  return (
    <div className="flex justify-center items-center p-8">
      <img
        src="/loading.svg"
        alt="Loading..."
        className="w-12 h-12 animate-spin-slow"
      />
    </div>
  );
}
