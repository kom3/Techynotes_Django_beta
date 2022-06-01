apt-get install python3-distutils

# Update pip
pip install wheel
python3.9 -m pip install --upgrade pip

pip install -r requirements.txt

python3.9 manage.py collectstatic

