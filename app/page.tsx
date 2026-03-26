"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { getCredential, setCredential } from "@/services/mainSerive";
import { CREDENTIAL } from "@/public/custom/credential";
import { CredentialData } from "@/models/main";
import { register } from "@/services/votingService";
import { decrypt } from "@/services/cryptoService";

export default function IntroPage() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  setCredential(CREDENTIAL);
  useEffect(() => {
    const credential: CredentialData = getCredential();
    const reqData = {
      app_version: credential.appVersion,
      device_id: credential.deviceId,
      session_id: credential.sessionId,
      wallet_user_id: credential.walletUserId,
    };
    register(reqData)
      .then((data) => {
        const dData = JSON.parse(decrypt(data.data));
        console.log(dData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleVote = () => {
    if (!accepted) return;
    router.push("/voting");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/images/FOE-Season.png" className={styles.season} />

        <p className={styles.tagline}>THE ULTIMATE FITNESS SHOWDOWN</p>

        <p className={styles.desc}>
          You can vote <b className={styles.boldDesc}>every 3 hours</b> until
          end of July 2026.
        </p>

        <div className={styles.footer}>
          <div className={styles.terms}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <span>
              I accept the <a href="#">terms & conditions</a>
            </span>
          </div>

          <button
            className={styles.btn}
            disabled={!accepted}
            onClick={handleVote}
          >
            Vote Now
          </button>

          <p className={styles.footerText}>Main Sponsored by uab bank</p>
        </div>
      </div>
    </div>
  );
}
