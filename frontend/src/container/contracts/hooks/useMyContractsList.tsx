import { useRouter } from "next/router";

const useMyContractsList = () => {
	const router = useRouter();

	const handleContractItemClick = (articleId: number, sellerId: string, buyerId: string) => {
		router.push(
			{
				pathname: `/contract/${articleId}`,
				query: { buyerId, sellerId, articleId },
			},
			`/contract/${articleId}`,
		);
	};

	return { handleContractItemClick };
};

export default useMyContractsList;
