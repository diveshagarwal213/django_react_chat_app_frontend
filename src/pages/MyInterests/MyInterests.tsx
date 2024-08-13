import { Button } from "@mui/material";
import { useMyInterestApiHook } from "../../hooks/ApiHooks/InterestApiHooks/InterestApiHooks";
import { BaseUserT } from "../../interfaces/user.interface";
import { PrimaryArrowForwardIcon } from "../../UI/Icons/Icons";
import { Link } from "react-router-dom";

function UserCard({
  user,
  interest_id,
}: {
  user: BaseUserT;
  interest_id: number;
}) {
  return (
    <Button
      to={`./${interest_id}/chats`}
      component={Link}
      endIcon={<PrimaryArrowForwardIcon />}
      variant="outlined"
      color="inherit"
      sx={{ justifyContent: "start" }}
    >
      {user.first_name ? (
        <span className="w-full text-left">
          {user.first_name} &nbsp;
          {user.last_name}
          <br />
          <span className="text-xs text-gray-400">({user.phone_number})</span>
        </span>
      ) : (
        user.phone_number
      )}
    </Button>
  );
}

function MyInterests() {
  const { data: my_interests } = useMyInterestApiHook({
    is_accepted: true,
  });
  return (
    <div className="primary-padding flex justify-center">
      <div className="max-w-sm w-full flex flex-col gap-2">
        {my_interests?.data.map((my_interest) => (
          <UserCard
            key={my_interest.id}
            interest_id={my_interest.id}
            user={my_interest.user}
          />
        ))}
        {!my_interests?.data.length && (
          <p className="text-sm text-gray-400 w-full text-center">
            No Accepted Interests
          </p>
        )}
      </div>
    </div>
  );
}

export default MyInterests;
