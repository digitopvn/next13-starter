import { randomElement } from "diginext-utils/dist/array";

export default function randomUrlImage() {
	//
	const cdn = "https://google-cdn.digitop.vn/diginext/static/avatar-512-webp";

	const list = [
		"/teexiii-adorable-cute-architect-persimmon-in-detail-work-placem-06bf36d7-9082-4b64-b178-3e6713fa24e4.webp",
		"/teexiii-adorable-cute-astronaut-apple-in-detail-work-placement-6bad0655-836c-44c5-a8a7-e3711cef5149.webp",
		"/teexiii-adorable-cute-baker-avocado-in-detail-work-placement-ma-a68c9fce-3ae2-43db-8f5f-505199db7220.webp",
		"/teexiii-adorable-cute-cashier-apricot-in-detail-work-placement-1080bfd2-a101-450e-a37a-8303994e88a4.webp",
		"/teexiii-adorable-cute-cashier-apricot-in-detail-work-placement-7ffede22-5ade-4091-9d45-cf04e6345d8d.webp",
		"/teexiii-adorable-cute-cook-blueberry-in-detail-work-placement-m-e7248a60-97f6-4b99-a014-9e87256f53d4.webp",
		"/teexiii-adorable-cute-designer-god-apollo-apollos-weapon-in-det-6f15052d-e007-436b-8885-2834c22bb8e7.webp",
		"/teexiii-adorable-cute-doctor-cherry-in-detail-work-placement-ma-9705c5e3-f852-4d8c-bda3-7ffb720d985b.webp",
		"/teexiii-adorable-cute-doctor-cherry-in-detail-work-placement-ma-d4f5e4f6-12c6-4942-b08d-52142bfe42b6.webp",
		"/teexiii-adorable-cute-farmer-mushroom-in-detail-work-placement-c67b1764-cef8-4670-94b5-1a30a2c966c0.webp",
		"/teexiii-adorable-cute-farmer-pineapple-in-detail-work-placement-4e006753-8912-415d-9ff5-6ecfd207589f.webp",
		"/teexiii-adorable-cute-farmer-pineapple-in-detail-work-placement-657f9c05-b6ab-47fa-9c3a-c86746bbf8d8.webp",
		"/teexiii-adorable-cute-judge-god-hypnos-hypnoss-weapon-in-detail-596a92b7-6b54-48fb-971e-4edfdb8d53d0-1.webp",
		"/teexiii-adorable-cute-lawyer-pear-in-detail-work-placement-many-02d28be3-8a36-4b24-ab87-87c69126dc34.webp",
		"/teexiii-adorable-cute-lawyer-pear-in-detail-work-placement-many-b0cda799-44e0-472a-9b6b-6458a2bc1eb6.webp",
		"/teexiii-adorable-cute-make-up-artist-god-demeter-demeters-weapo-377d8abd-1475-45a9-8fc2-75e76be1eed9.webp",
		"/teexiii-adorable-cute-make-up-artist-grapefruit-in-detail-work-b3afca53-7e68-4c34-b3be-975aacf93dcb.webp",
		"/teexiii-adorable-cute-miner-pepper-in-detail-work-placement-man-cea62656-2167-4379-b8b8-38d9df97e9d0.webp",
		"/teexiii-adorable-cute-model-mango-in-detail-work-placement-many-42b035b6-37a0-4594-a1b7-35a08ecb9b94.webp",
		"/teexiii-adorable-cute-model-mango-in-detail-work-placement-many-4be3076d-ada6-45d4-a143-8ce050939bee.webp",
		"/teexiii-adorable-cute-musician-strawberry-in-detail-work-placem-c7b10b79-2e7d-4cb5-b1bb-9197bc57b38d.webp",
		"/teexiii-adorable-cute-optician-god-adonis-adoniss-weapon-in-det-8d96c040-1b0e-419f-90e2-85921de50328.webp",
		"/teexiii-adorable-cute-pharmacist-god-hades-hadess-weapon-in-det-2be15ffa-0b44-4aff-8c64-e33d367313a2.webp",
		"/teexiii-adorable-cute-photographer-parsnip-in-detail-work-place-089b27ef-46a1-40e9-9400-745140e34077.webp",
		"/teexiii-adorable-cute-photographer-parsnip-in-detail-work-place-21db6feb-e201-4953-8ac9-9acfe78c1aca.webp",
		"/teexiii-adorable-cute-pilot-god-aphrodite-aphrodites-weapon-in-4500316c-2a05-4b20-9f26-4286c0dbe564.webp",
		"/teexiii-adorable-cute-pilot-god-aphrodite-aphrodites-weapon-in-83750eb9-6aa8-4500-b57a-dba28d273cbe.webp",
		"/teexiii-adorable-cute-police-officer-god-hebe-hebes-weapon-in-d-35b7b973-03a4-464d-8186-6937a0d8d082.webp",
		"/teexiii-adorable-cute-sailor-leek-in-detail-work-placement-many-f9caf113-92b1-480f-9621-0860235b583e.webp",
		"/teexiii-adorable-cute-scientist-eggplant-in-detail-work-placeme-42bcdb7b-b357-4ba2-8479-58fd0cd67359.webp",
		"/teexiii-adorable-cute-tour-guide-coconut-in-detail-work-placeme-23361090-0d12-40fa-bea1-859fa66a0b16.webp",
		"/teexiii-adorable-cute-tour-guide-coconut-in-detail-work-placeme-e131412b-316c-4818-a31a-e4f104a7df2f.webp",
	];

	return `${cdn}${randomElement(list)}`;
}
