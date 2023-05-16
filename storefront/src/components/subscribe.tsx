"use client";

import { subscribeToRestock } from "@/lib/actions";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useTransition } from "react";

type Props = {
  variantId: string;
};

const Subscribe = ({ variantId }: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FormData) => {
    const email = data.get("email") as string;

    if (!email) {
      setError("Email is required");
      return;
    }

    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const { error } = await subscribeToRestock(variantId, email);

      if (error) {
        setError(error);
      } else {
        setSuccess(true);
        ref.current?.reset();
      }
    });
  };

  // Wait to 1 seconds before rendering the form
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="mt-6 border border-gray-100 rounded-3xl p-6 shadow-lg bg-white"
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <h3 className="text-lg font-bold">Don&apos;t miss out.</h3>
      <p className="text-sm text-gray-500">
        Sign up to get notified when this product is back in stock
      </p>
      <form
        ref={ref}
        action={onSubmit}
        className="flex items-center justify-between mt-4 border border-gray-200 rounded-lg text-sm overflow-hidden"
      >
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="w-full bg-transparent py-2 px-4 outline-none "
        />
        <button
          className="bg-gray-100 h-full py-2 px-4 font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          Subscribe
        </button>
      </form>
      {error && (
        <motion.p animate={{}} className="text-red-500 text-xs mt-2.5">
          {error}
        </motion.p>
      )}
      {success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          className="text-green-500 text-xs mt-2.5"
        >
          You&apos;ll be the first to know when this product is back in stock.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Subscribe;
