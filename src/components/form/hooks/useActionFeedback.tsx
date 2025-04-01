import { useEffect } from "react";

import { ActionState } from "../utils";

export const useActionFeedback = (
  actionState: ActionState,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }
) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      onSuccess?.();
    } else if (actionState.status === "ERROR") {
      onError?.();
    }
  }, [actionState, onSuccess, onError]);
};
