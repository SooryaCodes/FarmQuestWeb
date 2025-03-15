import React from 'react';
import Image from 'next/image';

type UserPointsProps = {
  exp: number;
  coins: number;
};

const UserPoints: React.FC<UserPointsProps> = ({ exp, coins }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/images/coin.png" alt="Coins" width={20} height={20} />
      <span>{coins} Coins</span>
      <span>|</span>
      <span>{exp} EXP</span>
    </div>
  );
};

export default UserPoints; 