import { getMyFeed, MyFeedResponse } from '@/api/GetApi';
import ContentCard from '@/pages/components/ContentCard.tsx';
import { ContentItem } from '@/types/content';
import { useEffect, useState } from 'react';

interface ITabMenuProps {
  id: number;
  menu: string;
}

const tabMenu: ITabMenuProps[] = [
  {
    id: 1,
    menu: '내 피드',
  },
  {
    id: 2,
    menu: '내가 좋아한 피드',
  },
];

const getMyFeedData = async (userId: number) => {
  const result = await getMyFeed(userId);
  console.log(result);
  if (!result) {
    return null;
  }

  return result;
};

const MyFeedTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [myFeedData, setmyFeedData] = useState<
    MyFeedResponse | ContentItem | undefined
  >();

  useEffect(() => {
    const response = getMyFeedData(1);
    setmyFeedData(response);
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 w-full items-center h-16">
        {tabMenu.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex justify-center text-[15px] font-semibold py-3 hover:text-[#111111] hover:cursor-pointer ${activeTab === item.id ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-gray-500'}`}
          >
            {item.menu}
          </div>
        ))}
        <div className="px-4 py-4">
          {activeTab === 1 && (
            <ContentCard key={myFeedData?.id} item={myFeedData} />
          )}

          {activeTab === 2 && (
            <ContentCard key={myFeedData?.id} item={myFeedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFeedTab;
