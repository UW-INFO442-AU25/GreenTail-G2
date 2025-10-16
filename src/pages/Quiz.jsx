import { useMemo, useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import QuizProgress from '../components/QuizProgress.jsx';
import { saveQuizResult } from '../services/firestoreService.js';

const steps = [
  {
    id: 'petType',
    title: '你的宠物是谁？',
    description: '选择与你家庭最匹配的宠物类型，以生成专属营养建议。',
    options: [
      { value: 'kitten', label: '幼猫 Kitten' },
      { value: 'adult-cat', label: '成猫 Adult Cat' },
      { value: 'adult-dog', label: '成犬 Adult Dog' },
      { value: 'senior-dog', label: '高龄犬 Senior Dog' },
    ],
  },
  {
    id: 'dietaryRestrictions',
    title: '是否需要特别饮食？',
    description: '你可以多选任何适用的饮食限制，我们会自动过滤产品。',
    options: [
      { value: 'grain-free', label: '无谷 Grain-Free' },
      { value: 'hypoallergenic', label: '低敏 Hypoallergenic' },
      { value: 'low-sodium', label: '低钠 Low-Sodium' },
      { value: 'plant-forward', label: '植物基 Plant-Forward' },
    ],
  },
  {
    id: 'ecoPriority',
    title: '你的环保优先级？',
    description: '我们会根据优先级自动调整推荐排序权重。',
    options: [
      { value: 'balanced', label: '平衡 Balanced' },
      { value: 'high-eco', label: '环保优先 Eco First' },
      { value: 'value', label: '性价比 Value Focused' },
    ],
  },
];

export default function Quiz() {
  const {
    state: { petType, dietaryRestrictions, ecoPriority, completed },
    dispatch,
  } = useQuiz();
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = steps.length;
  const currentStep = steps[stepIndex];
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const selections = useMemo(
    () => ({
      petType,
      dietaryRestrictions,
      ecoPriority,
    }),
    [petType, dietaryRestrictions, ecoPriority],
  );

  const handleNext = async () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }
    setSaving(true);
    setConfirmation('');
    try {
      await saveQuizResult({ ...selections, completed: true, lastUpdated: new Date().toISOString() });
      dispatch({ type: 'COMPLETE_QUIZ' });
      setConfirmation('测验结果已保存，接下来看看推荐的产品吧！');
    } catch (error) {
      setConfirmation('保存失败，请稍后再试。');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleOptionChange = (value) => {
    switch (currentStep.id) {
      case 'petType':
        dispatch({ type: 'SET_PET_TYPE', payload: value });
        break;
      case 'dietaryRestrictions':
        dispatch({ type: 'SET_DIETARY_RESTRICTIONS', payload: toggleValue(dietaryRestrictions, value) });
        break;
      case 'ecoPriority':
        dispatch({ type: 'SET_ECO_PRIORITY', payload: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-brand-dark">Eco-Score 入门测验</h1>
        <p className="text-sm text-slate-600">
          根据你的回答，我们会把结果同步到 Firestore `users` 集合，并用于个性化推荐。
        </p>
      </header>
      <QuizProgress step={stepIndex + 1} total={totalSteps} />
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">Step {stepIndex + 1}</p>
          <h2 className="text-2xl font-semibold text-brand-dark">{currentStep.title}</h2>
          <p className="text-sm text-slate-600">{currentStep.description}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {currentStep.options.map((option) => {
            const isActive =
              currentStep.id === 'dietaryRestrictions'
                ? dietaryRestrictions.includes(option.value)
                : selections[currentStep.id] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionChange(option.value)}
                className={`rounded-2xl border px-4 py-5 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand ${
                  isActive ? 'border-brand bg-brand-light/60 text-brand-dark' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="text-sm font-semibold">{option.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={stepIndex === 0}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一步
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark disabled:opacity-50"
            disabled={saving}
          >
            {stepIndex === totalSteps - 1 ? (saving ? '保存中…' : '保存测验结果') : '下一步'}
          </button>
        </div>
        {confirmation && <p className="text-sm text-emerald-600">{confirmation}</p>}
        {completed && !confirmation && <p className="text-sm text-brand-dark">上次测验已完成，欢迎更新你的偏好。</p>}
      </section>
    </div>
  );
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
