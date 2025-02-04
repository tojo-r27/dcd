import parse from 'html-react-parser';

const parseHTML = (htmlString: string) => {
    return parse(htmlString);
}

export default parseHTML;