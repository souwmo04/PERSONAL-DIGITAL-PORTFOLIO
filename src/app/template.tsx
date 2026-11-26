"use client";

import { motion } from "motion/react";

/**
 * Route transition: each page fades in. Only opacity is animated, because a
 * transform or filter here would break `position: fixed` inside pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
