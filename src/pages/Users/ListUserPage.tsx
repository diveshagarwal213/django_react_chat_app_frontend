import { useMemo } from "react";
import { useListUserApiHook } from "../../hooks/ApiHooks/UserApiHooks/UserApiHook";
import { InterestT } from "../../interfaces/interest.interface";
import { BaseUserT } from "../../interfaces/user.interface";
import { Button } from "@mui/material";
import { DeleteIconButton } from "../../UI/Buttons/IconButtons";
import { PrimaryCheckIcon, PrimaryPersonAddIcon } from "../../UI/Icons/Icons";
import {
  useAcceptInterestApiHook,
  useCreateInterestApiHook,
  useDeleteInterestApiHook,
} from "../../hooks/ApiHooks/InterestApiHooks/InterestApiHooks";

type ActionT = "delete" | "accept";

function UserCard({
  user,
  sent_by,
  sent_to,
  handle_action,
  handle_create,
}: {
  user: BaseUserT;
  sent_to: InterestT | undefined;
  sent_by: InterestT | undefined;
  handle_create: (user_id: number) => void;
  handle_action: (action: ActionT, interest: InterestT | undefined) => void;
}) {
  // Note : sent_by means this user has sent current_user a request
  // - if request is accepected
  // Note : sent_to means current_user has sent this user a request
  const [actions] = useMemo(() => {
    const actions = {
      can_send_request: false,
      can_accept_request: false,
      cancel_request: true,
      pending_request: false,
      is_friend: false,
    };

    if (!sent_by && !sent_to) {
      actions.can_send_request = true;
      actions.cancel_request = false;
    }
    if (sent_by) {
      if (sent_by.is_accepted === false) actions.can_accept_request = true;
      else actions.is_friend = true;
    } else if (sent_to) {
      if (sent_to.is_accepted === false) actions.pending_request = true;
      else actions.is_friend = true;
    }

    return [actions];
  }, [sent_to, sent_by]);

  return (
    <div className="border rounded-md p-3 flex items-center justify-between">
      <div>
        {user.first_name ? (
          <p>
            {user.first_name} &nbsp;
            {user.last_name}
            <br />
            <span className="text-xs text-gray-400">({user.phone_number})</span>
          </p>
        ) : (
          user.phone_number
        )}
      </div>
      <div className="flex item-center gap-1">
        {actions.can_send_request && (
          <Button
            onClick={() => handle_create(user.id)}
            title="add people"
            variant="outlined"
            size="small"
          >
            <PrimaryPersonAddIcon />
          </Button>
        )}
        {actions.can_accept_request && (
          <Button
            onClick={() => handle_action("accept", sent_by)}
            title="Accept Request"
            endIcon={<PrimaryCheckIcon />}
            size="small"
            color="primary"
            variant="contained"
          >
            Accept
          </Button>
        )}
        {actions.pending_request && (
          <p className="text-xs text-gray-400 border inline-flex justify-center items-center  rounded-md border-gray-400 px-2">
            Pending...
          </p>
        )}
        {actions.is_friend && (
          <p className="text-xs text-primary border inline-flex justify-center items-center  rounded-md border-primary px-2 ">
            Friend
          </p>
        )}
        {actions.cancel_request && (
          <DeleteIconButton
            onClick={() => handle_action("delete", sent_by || sent_to)}
            size="small"
            color="default"
          ></DeleteIconButton>
        )}
      </div>
    </div>
  );
}

function ListUserPage() {
  //API Hooks
  const { data } = useListUserApiHook();
  // Mutations
  const { mutate: create_interest } = useCreateInterestApiHook();
  const { mutate: delete_interest } = useDeleteInterestApiHook();
  const { mutate: accept_interest } = useAcceptInterestApiHook();

  function handle_create(user_id: number) {
    create_interest({ sent_to: user_id });
  }
  function handle_action(action: ActionT, interest: InterestT | undefined) {
    if (!interest) return;
    if (action === "delete") delete_interest(interest.id);
    if (action === "accept") accept_interest(interest.id);
  }

  return (
    <div className="primary-padding flex justify-center">
      <div className="max-w-sm w-full flex flex-col gap-2">
        {data?.data.map(({ sent_by, sent_to, ...user }) => (
          <UserCard
            key={user.id}
            user={user}
            sent_by={sent_by[0]}
            sent_to={sent_to[0]}
            handle_action={handle_action}
            handle_create={handle_create}
          />
        ))}
      </div>
    </div>
  );
}

export default ListUserPage;
