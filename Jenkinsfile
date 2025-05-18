pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/AbdulAhad365/project'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'docker-compose build'
            }
        }

        stage('Run') {
            steps {
                echo 'Running the project...'
                sh 'docker-compose up -d'
            }
        }
    }
}
