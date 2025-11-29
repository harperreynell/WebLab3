const toolsData = {
    'bubble-sort': {
        name: 'Bubble Sort',
        title: 'Tool details: Bubble Sort',
        usage: 'Bubble sort is used for repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.',
        details: 'Bubble sort has a time complexity of O(n^2), making it highly inefficient for large datasets.',
        github: 'https://github.com/algorithms/bubblesort',
        snippet: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
        language: 'javascript'
    },
    'quick-sort': {
        name: 'Quick Sort',
        title: 'Tool details: Quick Sort',
        usage: 'Quick sort is a highly efficient, in-place sorting algorithm based on the divide-and-conquer paradigm.',
        details: 'Quick sort has an average time complexity of O(n log n), but a worst-case complexity of O(n^2).',
        github: 'https://github.com/algorithms/quicksort',
        snippet: `function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
        language: 'javascript'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof hljs === 'undefined') {
        console.error("Highlight.js is not loaded. Code highlighting will not work.");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('id');

    const tool = toolsData[toolId];

    const mainTitle = document.querySelector('.c-tool-details__title');
    const pageTitle = document.querySelector('title');
    const toolNameEl = document.querySelector('.tool-name');
    const toolUsageEl = document.querySelector('.tool-usage');
    const toolDetailsEl = document.querySelector('.tool-details-text');
    const toolGithubLink = document.querySelector('.tool-github-link a');
    const codeContentEl = document.querySelector('.code-content');

    if (tool) {
        pageTitle.textContent = tool.title;
        mainTitle.textContent = tool.title;
        
        if (toolNameEl) toolNameEl.textContent = tool.name;
        if (toolUsageEl) toolUsageEl.textContent = tool.usage;
        if (toolDetailsEl) toolDetailsEl.textContent = tool.details;
        
        if (toolGithubLink) {
            toolGithubLink.href = tool.github;
            toolGithubLink.textContent = tool.github;
        }
        
        if (codeContentEl) {
            codeContentEl.textContent = tool.snippet;
            
            codeContentEl.classList.add(`language-${tool.language}`);
            
            if (typeof hljs !== 'undefined') {
                hljs.highlightElement(codeContentEl);
            }
        }

    } else {
        pageTitle.textContent = 'Dev Tools Showcase - Tool Not Found';
        mainTitle.textContent = '404 Tool Not Found';
        if (codeContentEl) {
             codeContentEl.textContent = '// Error: Tool ID not recognized.';
             if (typeof hljs !== 'undefined') hljs.highlightElement(codeContentEl);
        }
        
        if (toolNameEl) toolNameEl.textContent = 'N/A';
        if (toolUsageEl) toolUsageEl.textContent = 'N/A';
        if (toolDetailsEl) toolDetailsEl.textContent = 'The requested tool was not found in the database.';
        if (toolGithubLink) {
            toolGithubLink.href = '#';
            toolGithubLink.textContent = 'N/A';
        }
    }
});