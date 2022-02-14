class GeneralHelper
{    
    static getInstance = () => {
		if (!GeneralHelper.instance) {
            GeneralHelper.instance = new GeneralHelper();
        }

		return GeneralHelper.instance;
    };

    ShuffleArray = (array) => 
	{
		for(let i = array.length - 1; i > 0; i--)
		{
			let j = Math.floor(Math.random() * (i +1)); //random index from 0 to i
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
}

export {GeneralHelper}