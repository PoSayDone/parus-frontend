"use client";

import { create } from "zustand";

interface ContactModalStore {
	isOpen: boolean;
	selectedService?: string;
	selectedPlan?: string;
	openModal: (service?: string, plan?: string) => void;
	closeModal: () => void;
}

export const useContactModal = create<ContactModalStore>((set) => ({
	isOpen: false,
	selectedService: undefined,
	selectedPlan: undefined,
	openModal: (service?: string, plan?: string) =>
		set({ isOpen: true, selectedService: service, selectedPlan: plan }),
	closeModal: () =>
		set({
			isOpen: false,
			selectedService: undefined,
			selectedPlan: undefined,
		}),
}));
