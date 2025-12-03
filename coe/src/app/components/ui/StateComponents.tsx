"use client";
import React from "react";
import { COMMON_STYLES } from "../../lib/constants";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => (
  <section className={`${COMMON_STYLES.container.section} ${className}`}>
    <div className={COMMON_STYLES.container.centered}>
      <div className={COMMON_STYLES.text.loading}>{message}</div>
    </div>
  </section>
);

interface ErrorStateProps {
  message: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, className = "" }) => (
  <section className={`${COMMON_STYLES.container.section} ${className}`}>
    <div className={COMMON_STYLES.container.centered}>
      <div className={COMMON_STYLES.text.error}>Error: {message}</div>
    </div>
  </section>
);

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  subtitle, 
  className = "" 
}) => (
  <div className={`${COMMON_STYLES.container.centered} ${className}`}>
    <div className={COMMON_STYLES.text.title}>
      {title}
      {subtitle && (
        <span className="block text-sm mt-2">{subtitle}</span>
      )}
    </div>
  </div>
);