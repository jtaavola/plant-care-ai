import { Leaf, Loader2, Sprout } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const App = () => {
  const [plantName, setPlantName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plantGuide, setPlantGuide] = useState('');

  const generatePlantGuide = async () => {
    setIsLoading(true);

    const response = await fetch(`/api/plant-guides?plantName=${plantName}`);

    if (response.ok) {
      const data = await response.json();
      setPlantGuide(data.plantGuide);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      // Show the spinner while loading
      return;
    }

    // Reset the input box after the guide is generated
    setPlantName('');
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Plant Care</title>
      </Head>
      <div className="flex flex-col items-center p-4 min-h-screen bg-green-100">
        <span className="inline-flex items-center gap-2 sm:mt-14">
          <Leaf />
          <h1 className="text-2xl sm:text-4xl font-bold">Plant Care Guides</h1>
          <Leaf className="-scale-x-100" />
        </span>

        <div className="flex flex-wrap my-6 gap-2">
          <input
            type="text"
            placeholder="Enter plant name"
            className="flex-auto border rounded-lg py-2 px-4"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                generatePlantGuide();
              }
            }}
          />
          <button
            className="bg-green-900 text-white hover:bg-white hover:text-green-900 rounded-lg border border-green-900 py-2 px-4"
            onClick={() => generatePlantGuide()}
          >
            <span className="inline-flex items-center gap-1">
              Generate
              <Sprout size={18} />
            </span>
          </button>
        </div>
        <div className="flex-1 flex sm:w-1/2 items-center justify-center">
          {isLoading ? (
            <div className="text-green-900 animate-spin">
              <Loader2 size={100} />
            </div>
          ) : (
            <>{plantGuide && <Markdown>{plantGuide}</Markdown>}</>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
