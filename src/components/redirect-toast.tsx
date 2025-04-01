"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  useEffect(() => {
    const showToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showToast();
  }, []);

  return null;
};

export { RedirectToast };
