import { useEffect } from "react";
import { Button } from "..";
interface Props {
  targetUser: any;
  setTargetUser: (targetUser: any) => void;
  setStep: (step: number) => void;
}
export default function RecipientDetails(props: Props) {
  const handleChange = (e: any) => {
    e.preventDefault;
    props.setTargetUser(e.target.value);
  };
  return (
    <div className="grid place-items-center">
      <h3>Enter Recipient Details</h3>
      <input
        type="text"
        className="block w-64 p-3 mb-4 mr-3 border rounded border-grey-light"
        name="value"
        placeholder="Enter Scale +91 Hackathon User"
        value={props.targetUser}
        onChange={handleChange}
      />
      <Button loading={false} onClick={() => props.setStep(1)}>
        Next
      </Button>
    </div>
  );
}
