"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RadioGroup } from "@/components/ui/radio-group";
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@modules/checkout/components/error-message";
import PaymentContainer from "@modules/checkout/components/payment-container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";
import { getBaseURL } from "@lib/util/env";

const Payment = ({
	cart,
	availablePaymentMethods,
}: {
	cart: any;
	availablePaymentMethods: any[];
}) => {
	const activeSession = cart.payment_collection?.payment_sessions?.find(
		(paymentSession: any) => paymentSession.status === "pending",
	);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [cardBrand, setCardBrand] = useState<string | null>(null);
	const [cardComplete, setCardComplete] = useState(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		activeSession?.provider_id ?? "",
	);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const isOpen = searchParams.get("step") === "payment";

	const isStripe = isStripeFunc(selectedPaymentMethod);

	const setPaymentMethod = async (method: string) => {
		setError(null);
		setSelectedPaymentMethod(method);
		if (isStripeFunc(method)) {
			await initiatePaymentSession(cart, {
				provider_id: method,
			});
		}
	};

	const paidByGiftcard =
		cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

	const paymentReady =
		(activeSession && cart?.shipping_methods.length !== 0) ||
		paidByGiftcard;

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const handleEdit = () => {
		router.push(pathname + "?" + createQueryString("step", "payment"), {
			scroll: false,
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const shouldInputCard =
				isStripeFunc(selectedPaymentMethod) && !activeSession;

			const checkActiveSession =
				activeSession?.provider_id === selectedPaymentMethod;

			if (!checkActiveSession) {
				await initiatePaymentSession(cart, {
					provider_id: selectedPaymentMethod,
					data: {
						confirmation: {
							type: "redirect",
							return_url: `${getBaseURL()}/api/capture-payment/${cart?.id}`,
						},
					},
				});
			}

			if (!shouldInputCard) {
				return router.push(
					pathname + "?" + createQueryString("step", "review"),
					{
						scroll: false,
					},
				);
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setError(null);
	}, [isOpen]);

	return (
		<div>
			<div className="flex flex-row items-center justify-between mb-6">
				<h2
					className={cn(
						"flex flex-row text-3xl gap-x-2 items-baseline",
						!isOpen &&
							!paymentReady &&
							"opacity-50 pointer-events-none select-none",
					)}
				>
					Способ оплаты
					{!isOpen && paymentReady && <CheckCircle2 />}
				</h2>
				{!isOpen && paymentReady && (
					<Button
						variant={"ghost"}
						size={"sm"}
						onClick={handleEdit}
						data-testid="edit-delivery-button"
					>
						Изменить
					</Button>
				)}
			</div>
			<div>
				<div className={isOpen ? "block" : "hidden"}>
					{!paidByGiftcard && availablePaymentMethods?.length && (
						<>
							<RadioGroup
								value={selectedPaymentMethod}
								onValueChange={(value: string) =>
									setPaymentMethod(value)
								}
							>
								{availablePaymentMethods.map(
									(paymentMethod) => (
										<div key={paymentMethod.id}>
											<PaymentContainer
												paymentInfoMap={paymentInfoMap}
												paymentProviderId={
													paymentMethod.id
												}
												selectedPaymentOptionId={
													selectedPaymentMethod
												}
											/>
										</div>
									),
								)}
							</RadioGroup>
						</>
					)}

					{paidByGiftcard && (
						<div className="flex flex-col w-1/3">
							<p className="txt-medium-plus text-ui-fg-base mb-1">
								Способ оплаты
							</p>
							<p
								className="txt-medium text-ui-fg-subtle"
								data-testid="payment-method-summary"
							>
								Подарочная карта
							</p>
						</div>
					)}

					<ErrorMessage
						error={error}
						data-testid="payment-method-error-message"
					/>

					<Button
						className="mt-6"
						onClick={handleSubmit}
						isLoading={isLoading}
						disabled={
							(isStripe && !cardComplete) ||
							(!selectedPaymentMethod && !paidByGiftcard)
						}
						data-testid="submit-payment-button"
					>
						Перейти к обзору
					</Button>
				</div>

				<div className={isOpen ? "hidden" : "block"}>
					{cart && paymentReady && activeSession ? (
						<div className="flex items-start gap-x-1 w-full">
							<div className="flex flex-col w-1/3">
								<p className="text-xl font-medium">
									Способ оплаты
								</p>
								<p
									className="text-lg"
									data-testid="payment-method-summary"
								>
									{paymentInfoMap[activeSession?.provider_id]
										?.title || activeSession?.provider_id}
								</p>
							</div>
							<div className="flex flex-col w-1/3">
								<p className="text-xl font-medium">
									Детали платежа
								</p>
								<div
									className="flex gap-0 text-lg items-center"
									data-testid="payment-details-summary"
								>
									<div className="flex items-center h-7 w-fit pr-2 bg-ui-button-neutral-hover">
										{paymentInfoMap[selectedPaymentMethod]
											?.icon || <CreditCard />}
									</div>
									<p>
										{isStripeFunc(selectedPaymentMethod) &&
										cardBrand
											? cardBrand
											: "Появится еще один шаг"}
									</p>
								</div>
							</div>
						</div>
					) : paidByGiftcard ? (
						<div className="flex flex-col w-1/3">
							<p className="text-xl font-medium">
								Детали платежа
							</p>
							<p
								className="text-lg"
								data-testid="payment-method-summary"
							>
								Подарочная карта
							</p>
						</div>
					) : null}
				</div>
			</div>
			<Separator className="mt-8" />
		</div>
	);
};

export default Payment;
