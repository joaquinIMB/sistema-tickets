export const TotalTickets = ({ background ,cantidad }) => {
    return (
      <span className={`absolute top-[39%] right-[20px] ${background} rounded-full min-w-6 h-4 text-xs text-white content-center text-center`}>
        {cantidad}
      </span>
    );
  }; 