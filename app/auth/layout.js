export default function LayoutAuth({ children }) {

  return (
    <div className="flex justify-center items-center py-2 min-h-screen">
      <main className={`flex flex-col items-center`}>{children}</main>
    </div>
  );
}
