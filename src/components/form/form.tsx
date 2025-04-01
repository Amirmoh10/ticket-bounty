import { useMemo } from "react";
import { toast } from "sonner";

import { useActionFeedback } from "./hooks/useActionFeedback";
import { ActionState } from "./utils";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
};

const Form = ({ action, actionState, children }: FormProps) => {
  const options = useMemo(() => {
    return {
      onSuccess: () => {
        if (actionState.message) {
          toast.success(actionState.message);
        }
      },
      onError: () => {
        if (actionState.message) {
          toast.error(actionState.message);
        }
      },
    };
  }, [actionState]);

  useActionFeedback(actionState, options);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
};

export default Form;
