import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/BaseComponents';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='h-[80vh] flex flex-col items-center justify-center text-center'
    >
      <h1 className='text-9xl font-bold text-active opacity-20'>404</h1>
      <div className='-mt-12'>
        <h2 className='text-3xl font-bold text-text-primary mb-4'>Page Not Found</h2>
        <p className='text-text-secondary mb-8 max-w-md mx-auto'>
          The module you are looking for does not exist or has been moved to a different sector.
        </p>
        <Button onClick={() => navigate('/')} variant='primary' size='lg'>
          Return to Dashboard
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;