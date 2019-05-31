import io

from setuptools import find_packages, setup

with io.open('ReadMe.md', 'r', encoding='utf8') as f:
    readme = f.read()

setup(
    name='hot-hands',
    version='0.1.0',
    url='https://github.com/alisol911/hot-hands',
    license='MIT',
    maintainer='Ali Soleimani',
    maintainer_email='alisol911@gmail.com',
    description='Hot Hands Game.',
    long_description=readme,
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'gunicorn'
    ],
    extras_require={
        'test': [
            'pytest',
            'coverage',
        ],
    },
)
