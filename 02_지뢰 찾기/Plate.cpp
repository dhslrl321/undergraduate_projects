#define _CRT_SECURE_NO_WARNINGS
#include "Plate.h"

//�Ϲ� char���� wide char������ �������
wchar_t plate[10][10];
void FirstPlateMakingProcess(void) {//���� ���� �� ���� ���μ���
	//const char *plate[10][10]; 

	setlocale(LC_ALL, "");//�������� 
	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			plate[i][j] = L'��';//
		}
	}
	printf(" 0 1 2 3 4 5 6 7 8 9 \n");//����� ����
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", plate[i][j]);//locale char�� ���
		}printf("\n");
	}
}

void UpdatedPlate(void) {
	printf(" 0 1 2 3 4 5 6 7 8 9 \n");//����� ����
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", plate[i][j]);//locale char�� ���
		}printf("\n");
	}
}

void ReplacingNear(int a, int b) {
	plate[a][b] = L'��';
}

void ReplacingHit(int a, int b) {
	plate[a - 100][b - 100] = L'��';
} //������ ������ ��

void MineMakingProcess(int *arr) {//���� ���� ���μ���
	srand(time(NULL));
	for (int i = 0; i < 8; i++) {
		*arr++ = rand() % 10;
	}
}
