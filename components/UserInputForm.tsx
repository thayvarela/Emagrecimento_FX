
import React, { useState } from 'react';
import { TargetShape } from '../types';

interface UserInputFormProps {
  onGenerate: (weight: number, height: number, shape: TargetShape) => void;
  isLoading: boolean;
}

const shapeOptions = Object.values(TargetShape);

export const UserInputForm: React.FC<UserInputFormProps> = ({ onGenerate, isLoading }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [shape, setShape] = useState<TargetShape>(TargetShape.Slim);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height && shape) {
      onGenerate(Number(weight), Number(height), shape);
    }
  };

  const isFormValid = weight && height && shape;

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6">Informe seus dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-slate-300 mb-2">Peso (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 75"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-slate-300 mb-2">Altura (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ex: 180"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Objetivo de Shape</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shapeOptions.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="shape"
                  value={option}
                  checked={shape === option}
                  onChange={() => setShape(option)}
                  className="sr-only"
                />
                <label
                  htmlFor={option}
                  className={`block w-full text-center py-3 px-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    shape === option
                      ? 'bg-cyan-500 border-cyan-400 text-white font-semibold shadow-md'
                      : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando seu plano...
            </>
          ) : (
            'Gerar Meu Plano'
          )}
        </button>
      </form>
    </div>
  );
};
