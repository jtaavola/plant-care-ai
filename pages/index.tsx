import { Leaf, Loader2, Sprout } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const App = () => {
  const [plantName, setPlantName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plantGuide, setPlantGuide] = useState('');
  const examplePlantGuide =
    "# 🌿 Plant Care Guide for Maidenhair Ferns 🌿\n\nMaidenhair ferns are delicate and beautiful plants that require specific care to thrive. Here are some tips to help you keep your Maidenhair fern healthy and happy:\n\n## 🌡️ Temperature and Humidity\n\nMaidenhair ferns prefer a cool and humid environment. They thrive in temperatures between 60-75°F (15-24°C) and humidity levels between 50-80%. Keep your fern away from drafts and direct sunlight, as they can dry out the leaves and cause damage.\n\n## 💦 Watering\n\nMaidenhair ferns require consistent moisture, but they don't like to sit in standing water. Water your fern when the top inch of soil feels dry to the touch. Use room temperature water and avoid getting water on the leaves, as this can cause spotting and damage. \n\n## 🌱 Soil and Fertilizer\n\nMaidenhair ferns prefer well-draining soil that is rich in organic matter. Use a potting mix that contains peat moss, perlite, and vermiculite. Fertilize your fern once a month during the growing season with a balanced liquid fertilizer.\n\n## 🪴 Repotting\n\nMaidenhair ferns prefer to be slightly root-bound, so only repot your fern when it becomes overcrowded in its current container. Use a pot that is only slightly larger than the current one and be gentle when handling the roots.\n\n## 🐛 Pests and Diseases\n\nMaidenhair ferns are susceptible to pests such as spider mites and mealybugs. Check your fern regularly for signs of infestation, such as webbing or white cottony spots. Treat any pests with an insecticidal soap or neem oil. Maidenhair ferns can also be prone to fungal diseases, so avoid getting water on the leaves and ensure good air circulation around the plant.\n\nBy following these care tips, you can enjoy the beauty of your Maidenhair fern for years to come!";

  const generatePlantGuide = () => {
    setIsLoading(true);

    // mock api call
    setTimeout(() => {
      setPlantGuide(examplePlantGuide);
      setIsLoading(false);
    }, 2000);
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
