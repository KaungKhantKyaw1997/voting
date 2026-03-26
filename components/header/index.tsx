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
  onClick: () => void;
};

export default function Header({
  leftText,
  rightText,
  showRightText = false,
  leftImage,
  rightImage,
  rightIcon,
  onClick,
}: HeaderProps) {
  const router = useRouter();
  const isLargeImg = !rightText;

  return (
    <div className={styles.container}>
      <div className={styles.imageRow}>
        <div>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <img src="/svg/back.svg" alt="back" className={styles.backIcon} />
          </button>

          {leftImage ? (
            <img src={leftImage} className={styles.leftImage} />
          ) : (
            <div />
          )}
          <p className={styles.leftText}>{leftText}</p>
        </div>
        <div>
          <div className={styles.textRow}>
            {rightImage ? (
              <img
                src={rightImage}
                className={`${styles.rightImage} ${
                  isLargeImg ? styles.largeImage : ""
                }`}
              />
            ) : (
              <div />
            )}

            {showRightText && rightText ? (
              <div className={styles.rightBadge}>
                {rightIcon && (
                  <img
                    src={rightIcon}
                    alt=""
                    className={styles.rightBadgeIcon}
                  />
                )}
                <span className={styles.rightBadgeText} onClick={onClick}>
                  {rightText}
                </span>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
