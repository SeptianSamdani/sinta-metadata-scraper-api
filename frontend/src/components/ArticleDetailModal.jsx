import { cleanAbstract } from '../utils/cleanAbstract';
import { formatAuthors } from '../utils/formatAuthors';

export default function ArticleDetailModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg relative">
        
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {article.title}
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Authors:</strong> {formatAuthors(article.authors)}
        </p>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Journal:</strong> {article.journal_title || 'Unknown'}
        </p>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Year:</strong> {article.publication_year || '-'}
        </p>

        {article.publisher && (
          <p className="text-sm text-gray-600 mb-2">
            <strong>Publisher:</strong> {article.publisher}
          </p>
        )}

        {article.citation_count !== null && (
          <p className="text-sm text-gray-600 mb-2">
            <strong>Citations:</strong> {article.citation_count}
          </p>
        )}

        {article.doi && (
          <a
            className="text-blue-600 underline text-sm block mb-4"
            href={`https://doi.org/${article.doi}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View DOI
          </a>
        )}

        <h3 className="font-semibold text-gray-700 mt-4 mb-2">Abstract</h3>
        <p className="text-gray-700 text-sm whitespace-pre-line">
          {cleanAbstract(article.abstract)}
        </p>

      </div>
    </div>
  );
}
