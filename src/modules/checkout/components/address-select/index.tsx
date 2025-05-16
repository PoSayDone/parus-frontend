import { useMemo } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import compareAddresses from "@lib/util/compare-addresses";
import { HttpTypes } from "@medusajs/types";

type AddressSelectProps = {
	addresses: HttpTypes.StoreCustomerAddress[];
	addressInput: HttpTypes.StoreCartAddress | null;
	onSelect: (
		address: HttpTypes.StoreCartAddress | undefined,
		email?: string,
	) => void;
};

const AddressSelect = ({
	addresses,
	addressInput,
	onSelect,
}: AddressSelectProps) => {
	const selectedAddress = useMemo(() => {
		return addresses.find((a) => compareAddresses(a, addressInput));
	}, [addresses, addressInput]);

	const handleSelect = (id: string) => {
		const savedAddress = addresses.find((a) => a.id === id);
		if (savedAddress) {
			onSelect(savedAddress as HttpTypes.StoreCartAddress);
		}
	};

	return (
		<Select value={selectedAddress?.id} onValueChange={handleSelect}>
			<SelectTrigger
				className="w-full text-left"
				data-testid="shipping-address-select"
			>
				<SelectValue placeholder="Choose an address">
					{selectedAddress?.address_1 || "Choose an address"}
				</SelectValue>
			</SelectTrigger>
			<SelectContent
				className="max-h-60 overflow-auto"
				data-testid="shipping-address-options"
			>
				<RadioGroup value={selectedAddress?.id}>
					{addresses.map((address) => (
						<SelectItem key={address.id} value={address.id} asChild>
							<div
								className="cursor-pointer py-4 pl-6 pr-10 hover:bg-gray-50"
								data-testid="shipping-address-option"
							>
								<div className="flex gap-x-4 items-start">
									<RadioGroupItem
										value={address.id}
										id={address.id}
										className="mt-1"
										data-testid="shipping-address-radio"
									/>
									<div className="flex flex-col">
										<Label
											htmlFor={address.id}
											className="text-left font-semibold"
										>
											{address.first_name}{" "}
											{address.last_name}
										</Label>
										{address.company && (
											<span className="text-sm text-muted-foreground">
												{address.company}
											</span>
										)}
										<div className="flex flex-col text-left mt-2">
											<span>
												{address.address_1}
												{address.address_2 && (
													<span>
														, {address.address_2}
													</span>
												)}
											</span>
											<span>
												{address.postal_code},{" "}
												{address.city}
											</span>
											<span>
												{address.province &&
													`${address.province}, `}
												{address.country_code?.toUpperCase()}
											</span>
										</div>
									</div>
								</div>
							</div>
						</SelectItem>
					))}
				</RadioGroup>
			</SelectContent>
		</Select>
	);
};

export default AddressSelect;
