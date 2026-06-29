'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  language?: 'en' | 'ru';
  variant?: 'default' | 'procurement';
}

export default function ApplicationModal({
  isOpen,
  onClose,
  source = 'unknown',
  language = 'en',
  variant = 'default',
}: ApplicationModalProps) {
  const copy = {
    default: {
      en: {
        badge: 'Launch request',
        title: 'Get started with',
        highlight: 'Tech Catalyst',
        subtitle: 'Create your free account and tell us what you want to build.',
        name: 'Name *',
        company: 'Company',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Use case',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase: 'Describe the product, expected traffic, target models or procurement constraints.',
        },
        submitting: 'Submitting...',
        submit: 'Create free account',
        success: "Application submitted. We'll contact you soon.",
        error: 'Request failed. Please try again.',
        agreement: 'By clicking the button, you agree to the service terms and privacy policy.',
        requireCompany: false,
      },
      ru: {
        badge: 'Launch request',
        title: 'Начните работу с',
        highlight: 'ТехКаталист',
        subtitle: 'Создайте бесплатный аккаунт и коротко опишите ваш сценарий использования.',
        name: 'Имя *',
        company: 'Компания',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Сценарий использования',
        placeholder: {
          name: 'Иван',
          company: 'ООО Пример',
          email: 'ivan@example.com',
          telegram: '@username',
          useCase: 'Опишите продукт, ожидаемую нагрузку, интересующие модели или требования закупки.',
        },
        submitting: 'Отправка...',
        submit: 'Создать бесплатный аккаунт',
        success: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        error: 'Не удалось отправить заявку. Попробуйте ещё раз.',
        agreement: 'Нажимая кнопку, вы соглашаетесь с условиями сервиса и политикой конфиденциальности.',
        requireCompany: false,
      },
    },
    procurement: {
      en: {
        badge: 'Procurement request',
        title: 'Foreign software',
        highlight: 'procurement',
        subtitle:
          'Tell us which software you need, the license volume, timing and document requirements. We will prepare a procurement route and commercial estimate.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Software and requirements *',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase:
            'For example: OpenAI / Claude / Microsoft 365 / Adobe, number of licenses, renewal date, contract or closing document requirements.',
        },
        submitting: 'Submitting...',
        submit: 'Request procurement estimate',
        success: 'Request submitted. We will prepare the procurement route and contact you shortly.',
        error: 'Request failed. Please try again.',
        agreement: 'By clicking the button, you agree to the service terms and privacy policy.',
        requireCompany: true,
      },
      ru: {
        badge: 'Запрос на закупку',
        title: 'Закупка зарубежного ПО',
        highlight: 'ТехКаталист',
        subtitle:
          'Опишите нужное ПО, объём лицензий, срок и требования к документам. Мы подготовим маршрут закупки и коммерческий расчёт.',
        name: 'Имя *',
        company: 'Компания *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Какое ПО и какие требования *',
        placeholder: {
          name: 'Иван',
          company: 'ООО Пример',
          email: 'ivan@example.com',
          telegram: '@username',
          useCase:
            'Например: OpenAI / Claude / Microsoft 365 / Adobe, число лицензий, дата продления, требования к договору и закрывающим документам.',
        },
        submitting: 'Отправка...',
        submit: 'Получить расчёт закупки',
        success: 'Запрос отправлен. Подготовим маршрут закупки и свяжемся с вами.',
        error: 'Не удалось отправить заявку. Попробуйте ещё раз.',
        agreement: 'Нажимая кнопку, вы соглашаетесь с условиями сервиса и политикой конфиденциальности.',
        requireCompany: true,
      },
    },
  };

  const translations = copy[variant][language];
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    email: '',
    telegram: '',
    mvpDescription: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source, type: variant }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({
            firstName: '',
            company: '',
            email: '',
            telegram: '',
            mvpDescription: '',
          });
          setSubmitStatus('idle');
          onClose();
        }, 1600);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(49,49,49,.46)] backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[560px] rounded-panel border border-line bg-white p-7 shadow-panel sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex rounded-full border border-line bg-soft p-2 text-muted transition-colors hover:border-blue hover:text-blue"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-10">
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-[.12em] text-blue">{translations.badge}</div>
          <h3 className="text-[30px] font-semibold leading-[1.15] tracking-[-.02em] text-[#222]">
            {translations.title} <span className="text-blue">{translations.highlight}</span>
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-muted">{translations.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
              {translations.name}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-[16px] border border-line bg-soft px-4 py-3 text-ink outline-none transition-colors focus:border-blue"
              placeholder={translations.placeholder.name}
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
              {translations.company}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required={translations.requireCompany}
              className="w-full rounded-[16px] border border-line bg-soft px-4 py-3 text-ink outline-none transition-colors focus:border-blue"
              placeholder={translations.placeholder.company}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              {translations.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-[16px] border border-line bg-soft px-4 py-3 text-ink outline-none transition-colors focus:border-blue"
              placeholder={translations.placeholder.email}
            />
          </div>

          <div>
            <label htmlFor="telegram" className="mb-1.5 block text-sm font-medium text-ink">
              {translations.telegram}
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full rounded-[16px] border border-line bg-soft px-4 py-3 text-ink outline-none transition-colors focus:border-blue"
              placeholder={translations.placeholder.telegram}
            />
          </div>

          <div>
            <label htmlFor="mvpDescription" className="mb-1.5 block text-sm font-medium text-ink">
              {translations.useCase}
            </label>
            <textarea
              id="mvpDescription"
              name="mvpDescription"
              value={formData.mvpDescription}
              onChange={handleChange}
              rows={4}
              required={variant === 'procurement'}
              className="w-full resize-none rounded-[16px] border border-line bg-soft px-4 py-3 text-ink outline-none transition-colors focus:border-blue"
              placeholder={translations.placeholder.useCase}
            />
          </div>

          {submitStatus === 'success' ? (
            <div className="rounded-[16px] border border-[#cce9cc] bg-[#f5fcf5] px-4 py-3 text-sm text-[#256b25]">
              {translations.success}
            </div>
          ) : null}

          {submitStatus === 'error' ? (
            <div className="rounded-[16px] border border-[#f2c8cf] bg-[#fff6f8] px-4 py-3 text-sm text-danger">
              {translations.error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-blue px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta disabled:cursor-not-allowed disabled:bg-[#97a2e3] disabled:shadow-none"
          >
            {isSubmitting ? translations.submitting : translations.submit}
          </button>

          <p className="text-center text-xs leading-5 text-dim">{translations.agreement}</p>
        </form>
      </div>
    </div>
  );
}
