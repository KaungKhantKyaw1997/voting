"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

type HeaderProps = {
  leftText?: string;
  rightText?: string;
  showRightText?: boolean;
  leftImage?: string;
  rightImage?: string;
  rightIcon?: string;
};

export default function Header({
  leftText,
  rightText,
  showRightText = false,
  leftImage,
  rightImage,
  rightIcon,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <img src="/svg/back.svg" alt="back" className={styles.backIcon} />
        </button>
      </div>

      <div className={styles.imageRow}>
        {leftImage ? (
          <img src={leftImage} className={styles.leftImage} />
        ) : (
          <div />
        )}

        {rightImage ? (
          <img src={rightImage} className={styles.rightImage} />
        ) : (
          <div />
        )}
      </div>

      <div className={styles.textRow}>
        <p className={styles.leftText}>{leftText}</p>

        {showRightText && rightText ? (
          <div className={styles.rightBadge}>
            {rightIcon && (
              <img src={rightIcon} alt="" className={styles.rightBadgeIcon} />
            )}
            <span className={styles.rightBadgeText}>{rightText}</span>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
