import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInPrompt = () => {
	return (
		<div className="bg-white flex items-center justify-between">
			<div>
				<h2 className="txt-xlarge">Already have an account?</h2>
				<p className="txt-medium text-ui-fg-subtle mt-2">
					Sign in for a better experience.
				</p>
			</div>
			<div>
				<Link href="/account">
					<Button
						variant="secondary"
						className="h-10"
						data-testid="sign-in-button"
					>
						Sign in
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default SignInPrompt;
