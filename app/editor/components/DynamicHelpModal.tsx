"use client";

import dynamic from "next/dynamic";

const HelpModal = dynamic(() => import("./HelpModal"), { ssr: false });

export default HelpModal;
