import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-600">
      <div className="w-full h-1/4 flex justify-center items-center font-bold text-2xl text-white pt-5">
        <h1>Face Recognition</h1>
      </div>
      <div className="w-full h-3/4 flex flex-wrap justify-around items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link href="/photo">Photo Input</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link href="/futurelove">Future Love</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link href="/camera">Camera Input</Link>
        </button>
      </div>
    </main>
  );
}
