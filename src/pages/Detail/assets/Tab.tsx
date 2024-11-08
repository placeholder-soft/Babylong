export enum TabType {
  BUY,
  SELL,
}

export const Tab = ({
  activeTab,
  onChange,
}: {
  activeTab: TabType
  onChange: (tab: TabType) => void
}) => {
  const tabs = [
    {
      name: "Buy",
      type: TabType.BUY,
    },
    {
      name: "Sell",
      type: TabType.SELL,
    },
  ]
  return (
    <div className="border-[rgba(0, 0, 0, 0.30)] relative flex border-b border-solid">
      {tabs.map((item, index) => (
        <div
          onClick={() => onChange(item.type)}
          key={index}
          className={`relative flex-1 cursor-pointer p-[24px] text-center text-[26px] font-[900] leading-[140%] ${
            activeTab === item.type ? "" : "opacity-50"
          }`}
        >
          {item.name}
        </div>
      ))}
      <div
        className="absolute bottom-0 left-0 h-2 w-1/2 bg-black transition-transform duration-300"
        style={{
          transform: `translateX(${activeTab === TabType.BUY ? "0%" : "100%"})`,
        }}
      />
    </div>
  )
}
